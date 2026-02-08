<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use App\Models\CustomerHistory;
use App\Models\User;
use PhpOffice\PhpSpreadsheet\IOFactory;
use ZipArchive;

class ProcessExcelUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $filePath;

    public function __construct($filePath)
    {
        $this->filePath = $filePath;
    }
    /**
     * Execute the job.
     */
    public function handle()
    {
        $filePath = storage_path('app/' . $this->filePath);
        $zip = new ZipArchive;

        if ($zip->open($filePath) === true) {
            // Extract the contents of the zip (XLSX files are zip files)
            $zip->extractTo(storage_path('app/extracted'));
            $zip->close();

            // Load the extracted XML data
            $xml = simplexml_load_file(storage_path('app/extracted/xl/sharedStrings.xml'));
            $sharedStrings = [];
            foreach ($xml->si as $si) {
                $sharedStrings[] = (string)$si->t;
            }

            $xml = simplexml_load_file(storage_path('app/extracted/xl/worksheets/sheet1.xml'));
            $namespaces = $xml->getNamespaces(true);
            $rows = $xml->sheetData->row;

            foreach ($rows as $index => $row) {
                $data = [];
                foreach ($row->c as $cell) {
                    $value = (string)$cell->v;
                    if (isset($cell['t']) && $cell['t'] == 's') {
                        $value = $sharedStrings[(int)$value];
                    }
                    $data[] = $value;
                }

                // Skip the header row (assuming the first row is the header)
                if ($index == 0) {
                    continue;
                }

                // Insert each row into the database
                CustomerHistory::create([
                    'name' => $data[0],
                    'email' => $data[1],
                    'password' => bcrypt($data[2]),
                ]);
            }
        } else {
            throw new \Exception("Unable to open file!");
        }
    }
}

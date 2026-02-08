<!-- In your Blade view file -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upload Excel File</title>
    <!-- Bootstrap CSS CDN -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
    .table-bordered td,
    .table-bordered th {
        padding: 0.2rem; /* Adjust the padding value as needed */
    }
</style>
</head>
<body>

<!-- In your Blade view file -->
<div class="container">
<div class="container">
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif
    <!-- Your upload form here -->
</div>
    <h2>Upload Excel File</h2>
    <form action="{{ url('submit') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <label for="file">Choose Excel File:</label>
            <input type="file" class="form-control-file" id="file" name="file" required>
        </div>
        <button type="submit" class="btn btn-primary">Upload</button>

    </form>

    <hr/>
    <div algin><a href="{{ url('/upload') }}">Refreesh</a></div>
    <table class="table table-bordered table-hover">
    <thead>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($uploads as $upload)
            <tr>
                <td>{{ $upload->name }}</td>
                <td>{{ $upload->email }}</td>
                <td>{{ $upload->password }}</td>
            </tr>
        @endforeach
    </tbody>
</table>

<!-- Pagination Links -->
<div class="row">
    <div class="col-md-6">
        <p>Total Rows: {{ $uploads->total() }}</p>
    </div>
    <div class="col-md-6">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end">
                {{-- Previous Page Link --}}
                @if ($uploads->onFirstPage())
                    <li class="page-item disabled"><span class="page-link">Previous</span></li>
                @else
                    <li class="page-item"><a class="page-link" href="{{ $uploads->previousPageUrl() }}">Previous</a></li>
                @endif

                {{-- Page Links --}}
                @for ($i = max(1, $uploads->currentPage() - 2); $i <= min($uploads->lastPage(), $uploads->currentPage() + 2); $i++)
                    <li class="page-item {{ $i === $uploads->currentPage() ? 'active' : '' }}">
                        <a class="page-link" href="{{ $uploads->url($i) }}">{{ $i }}</a>
                    </li>
                @endfor

                {{-- Next Page Link --}}
                @if ($uploads->hasMorePages())
                    <li class="page-item"><a class="page-link" href="{{ $uploads->nextPageUrl() }}">Next</a></li>
                @else
                    <li class="page-item disabled"><span class="page-link">Next</span></li>
                @endif
            </ul>
        </nav>
    </div>
</div>



</div>



</body>
</html>

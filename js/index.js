let baseURL = "https://api-reading.istad.co/api/v1"
let headers = {
    "Authorization": "NONO",
    "Content-Type": "Application/json"
}

$(document).ready(function(){
    fetchStudents()
    let text = {
        title: "Loop"
    }
    searchBook(text)
    $("#showModal").on('click', function(){
        $("#addBookModal").modal('show')
        $("#addBookModalLabel").text("Add Book")
        $('#title').val('')
        $('#description').val('')
        $('#author').val('')
        $('#pdf').val('')
    })

    $('#save').on('click', function(){
        console.log("add book was clicked")
        let book = {
            title: $("#title").val(),
            description: $("#description").val(),
            author: $("#author").val(),
            pdf: $("#pdf").val(),
            fileId: 25,
            genreIds: [6],
            isPublished: true

        }
        if ($("#addBookModalLabel").text() == "Add Book"){
            insertBook(book)
            $("#addBookModal").modal('hide')
        }else{
            updateBook(book, $('#book_id').val())
            $("#addBookModal").modal('hide')
        }
    })
});

function fetchStudents(){
    $.ajax({
        url: `${baseURL}/books`,
        headers: headers,
        method: 'GET',
        success: function(res){
            console.log(res)
            // append to table
            appendToTable(res.data.list)
        },
        error: function(er){
            console.log(er)
        } 
    })
}

function appendToTable(books){
    let content = ""
    for (book of books){
        content += `
            <tr>
                <th scope="row">${book.id}</th>
                <td>${book.title}</td>
                <td>${book.description}</td>
                <td>${book.author}</td>
                <td>${book.pdf}</td>
                <td>${book.title}</td>
                <td>
                    <button type="button" class="btn btn-success" data-mdb-ripple-color="dark" onclick="editBook(this)">Edit</button>
                    <button type="button" class="btn btn-outline-danger mt-2" data-mdb-ripple-color="dark" onclick="deleteBook(${book.id})">Delete</button>
                </td>
            </tr>
        
        `
    }
    $('tbody').html(content)
}

function deleteBook(id){
    let okay = confirm("Are you sure to delete?")
    if ( okay ) {
        $.ajax({
            url: `${baseURL}/books/${id}`,
            headers: headers,
            method: 'DELETE',
            success: function(res){
                console.log(res)
                fetchStudents()
            },
            error: function(er){
                console.log(er)
            }
        })
    }
}

function insertBook(book){
    $.ajax({
        url: `${baseURL}/books`,
        method: "POST",
        headers: headers,
        data: JSON.stringify(book),
        success: function(res){
            console.log(res)
            fetchStudents()
        },
        error: function(er){
            console.log(er)
        }
    })
}

function editBook(btnEdit){
    $("#addBookModal").modal('show')
    $("#addBookModalLabel").text("Editing Book")
    let title = $(btnEdit).parent().siblings().eq(1).text()
    let desc = $(btnEdit).parent().siblings().eq(2).text()
    let author = $(btnEdit).parent().siblings().eq(3).text()
    let pdf = $(btnEdit).parent().siblings().eq(4).text()
    console.log(title);
    $('#title').val(title)
    $('#description').val(desc)
    $('#author').val(author)
    $('#pdf').val(pdf)
    $("#book_id").val($(btnEdit).parent().siblings().eq(0).text())
}

function updateBook(book, id){
    $.ajax({
        url: `${baseURL}/books/${id}`,
        headers: headers,
        data: JSON.stringify(book),
        method: "PUT",
        success: function(res){
            console.log(res)
            fetchStudents()
        },
        error: function(er){
            console.log(er)
        }
    })
}

function searchBook(text){
    $.ajax({
        url: `${baseURL}/books`,
        headers: headers,
        method: "GET",
        body: JSON.stringify({
            title: "Loop"
        }),
        success: function(res){
            console.log("searching");
            console.log(res)
            appendToTable(res.data.list)
        },
        error: function(er){
            console.log(er)
        }
    })
}



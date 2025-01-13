import express from 'express';

const app = express();
const port = 3000;

let blogs = [];
let id = 1;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// render index.js with blog info if there is any
app.get('/', (req, res) => {
    res.render('index.ejs', {blogs: blogs});
});

// go to create route if button clicked 
app.get('/create', (req, res) => {
    res.render('create.ejs');
});

// after form is submitted in create the data is send through and data is added to the blog array
app.post('/', (req,res) => {
    const blog = {id: id, ...req.body};
    blogs.push(blog);
    id++
    res.render('index.ejs',{blogs: blogs});
});

// rendering each blog using their unique id
app.get('/blog/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs.find(b=> b.id == blogId);
    res.render('blogDetails.ejs', {blog});
})

// find the id of the blog then filer the blogs array and redirect
app.get('/delete/:id', (req, res) => {;
    const blogId = req.params.id;
    const blog = blogs.find(b => b.id == blogId);
    blogs = blogs.filter(b => b.id !== blog.id);
    res.redirect('/');
});

// when update button is clicked blog data is send back to update.ejs after finding the blog data
app.get('/update/:id', (req, res) => {
    const blog = blogs.find(b => b.id == req.params.id);
    res.render('update.ejs', {blog})
});

// after the updating the data is sent back and is used to modify the array using find 
app.post('/update/:id', (req, res) => {
    const { id } = req.params
    const { title, content} = req.body

    const blog = blogs.find( b => b.id == id);

    blog.title = title
    blog.content = content;
    
    res.redirect('/');
})

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
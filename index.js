import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', {blogs: blogs});
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

let blogs = [];
let id = 1;

app.post('/', (req,res) => {
    const blog = {id: id, ...req.body};
    blogs.push(blog);
    id++
    res.render('index.ejs',{blogs: blogs});
});

app.get('/blog/:id', (req, res) => {
    const blogId = req.params.id;
    const blog = blogs.find(b=> b.id == blogId);
    res.render('blogDetails.ejs', {blog});
})

app.get('/delete/:id', (req, res) => {;
    const blogId = req.params.id;
    const blog = blogs.find(b => b.id == blogId);
    blogs = blogs.filter(b => b.id !== blog.id);
    res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const blog = blogs.find(b => b.id == req.params.id);
    res.render('update.ejs', {blog})
});

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
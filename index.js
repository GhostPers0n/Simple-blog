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

const blogs = [];
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


app.listen(port, () => {
    console.log(`listening on ${port}`);
});
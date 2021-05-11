import express, {Application, Request, Response, NextFunction} from 'express';
import path from 'path';
//import moment from 'moment';
import exphbs from 'express-handlebars';

const logger = require('../middleware/logger');
const members = require('../Members');




// const members = require('../Members');

const app: Application = express();

//const add = (a: number, b: number): number => a + b;

const PORT = process.env.PORT || 5000;


// Init Middleware
//app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req:Request, res:Response) => res.render('index', {
    title: 'Members App',
    members
}));



// app.get('/', (req: Request, res: Response, next: NextFunction ) => {
//     // console.log(add(5,4))
//     // res.send('Hello');
//     res.sendFile(path.join(__dirname,'../public','index.html'))
// });

// Set Static Folder
app.use(express.static(path.join(__dirname,'../public')));

// Members API Routes
app.use('/api/members', require('../routes/api/members'));


app.listen(PORT, () => console.log(`Server running ${PORT}`));
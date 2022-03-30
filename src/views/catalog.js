import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllCatalog } from '../api/data.js';

const catalogTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            ${books.lenght == 0 
            ? html `<p class="no-books">No books in database!</p>`
            : html `<ul class="other-books-list">${books.map(bookTemplate)}</ul>`}                        
 </section>`;


const bookTemplate = (book) => html`
           <li class="otherBooks">
                    <h3>${book.title}</h3>
                    <p>Type: ${book.type}</p>
                    <p class="img"><img src=${book.imageUrl}></p>
                    <a class="button" href="/details">Details</a>
                </li>`;

export async function catalogPage(ctx){
    const books = await getAllCatalog();
    ctx.render(catalogTemplate(books));
}

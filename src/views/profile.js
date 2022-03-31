import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyBooks } from '../api/data.js';

const profileTemplate = (books, bookTemplate) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${ books.length == 0 
    ? html `<p class="no-books">No books in database!</p>`
    : html `<ul class="my-books-list">${books.map(bookTemplate)}</ul>`}
</section>`;

const bookTemplate = (book) => html`
    <li class="otherBooks">
        <h3>${book.title}</h3>
        <p>Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <a class="button" href="/details/${book._id}">Details</a>
    </li>`;

export async function profilePage(ctx) {
    const books = await getMyBooks();
    ctx.render(profileTemplate(books, bookTemplate))
}
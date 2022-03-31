import { html } from '../../node_modules/lit-html/lit-html.js';
import { edit, getById } from '../api/data.js';

const editTemplate = (book, onSubmit) => html`
    <section id="edit-page" class="edit">
        <form @submit=${onSubmit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value="A Court of Thorns and Roses" .value=${book.title}>
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description"
                            id="description" .value=${book.description}>Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value="/images/book1.png" .value=${book.imageUrl}>
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" value="Fiction" .value=${book.type}>
                            <option value="Fiction" selected>Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>`;

export async function editPage(ctx) {
    const bookId = ctx.params.id;
    const book = await getById(bookId);
    ctx.render(editTemplate(book, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const type = formData.get('type');

        try{

            if(!title || !description || !imageUrl || !type){
                throw new Error('All fields are required!')
            }

            await edit(bookId, {title, description, imageUrl, type});
            ctx.setUserNav();
            ctx.page.redirect('/details/'+ bookId)
        }catch(err){
            alert(err.message);
        }
    }
}
import * as api from './api.js';

const viewUrl = {
    catalog: '/data/books?sortBy=_createdOn%20desc',
    create: '/data/books',
    details: '/data/books/',
    edit: '/data/books/',
    delete: '/data/books/',
};

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Application specific requests

export async function getAllCatalog() {
        return api.get(viewUrl.catalog);
}
export async function create(book) {
    return api.post(viewUrl.create, book);
}
export async function getById(idofEditMeme) {
    return api.get(viewUrl.details + idofEditMeme);
}
export async function edit(idofEditMeme, book) {
    return api.put(viewUrl.edit + idofEditMeme, meme);
}
export async function delETE(idofEditMeme) {
    return api.del(viewUrl.delete + idofEditMeme);
}

export async function getMyMemes() {
    const userId = sessionStorage.getItem('userId');
    return api.get(`/data/books?where=_ownerId%3D%22{userId}%22&sortBy=_createdOn%20desc`)
}
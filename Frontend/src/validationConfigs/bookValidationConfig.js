export default {
    title: {
        fieldName: 'Title',
        rule: 'required'
    },
    price: {
        fieldName: 'Name',
        rule: 'required|numeric|min:0,num'
    },
    publishYear: {
        fieldName: 'Publish year',
        rule: 'required|numeric|min:0,num|max:2020,num'
    },
    image: {
        fieldName: 'Image',
        rule: 'required'
    },
    description: {
        fieldName: 'Description',
        rule: 'required'
    },
    pages: {
        fieldName: 'Pages',
        rule: 'required|numeric|min:0,num'
    }
};

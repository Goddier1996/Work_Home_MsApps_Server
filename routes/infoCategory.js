const express = require('express');
const axios = require('axios');
const router = express.Router();


// key pixabay
const API_KEY = '25540812-faf2b76d586c1787d2dd02736';



// here get all data with name category(id)
router.get('/itemsCategoryId/:id/:page', async (req, res) => {

    const searchTerm = req.params.id;
    const pageNumber = req.params.page;

    try {
        // limit in page 9 items
        const perPage = 9;

        const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&per_page=${perPage}&page=${pageNumber}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        const images = data.hits.slice(0, 9);
        // here we sort data with id
        const resAfterSortDataWithId = images.sort((a, b) => a.id - b.id);



        res.json(resAfterSortDataWithId);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});



// here get count with name category(id)
router.get('/count/:id', async (req, res) => {

    try {
        const searchTerm = req.params.id; // Default search term if none provided

        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}`;

        const response = await axios.get(url);

        const itemsCount = response.data.hits;

        res.json(itemsCount.length);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'An error occurred while counting Pixabay items.' });
    }


});


module.exports = router;
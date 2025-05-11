const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /addSchool
router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /listSchools?latitude=..&longitude=..
router.get('/listSchools', async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLong = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLong)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  try {
    const [schools] = await db.query('SELECT * FROM schools');

    const sorted = schools.map(school => {
      const distance = Math.sqrt(
        Math.pow(school.latitude - userLat, 2) +
        Math.pow(school.longitude - userLong, 2)
      );
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

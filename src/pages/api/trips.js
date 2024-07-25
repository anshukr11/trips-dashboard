import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { page = 0, rowsPerPage = 10 } = req.query;
    const filePath = path.join(process.cwd(), 'data', 'trips.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    const start = page * rowsPerPage;
    const end = start + parseInt(rowsPerPage, 10);
    const paginatedTrips = data.data.slice(start, end);

    res.status(200).json({
      data: paginatedTrips,
      totalTrips: data.data.length
    });
  } else if (req.method === 'POST') {
    // Handle adding a new trip
    const newTrip = req.body
    const filePath = path.join(process.cwd(), 'data', 'trips.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    data.data.push(newTrip)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    res.status(200).json({ message: 'Trip added successfully' })
  } else if (req.method === 'PUT') {
    // Handle updating an existing trip
    const updatedTrip = req.body
    const filePath = path.join(process.cwd(), 'data', 'trips.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)
    const index = data.data.findIndex(trip => trip._id === updatedTrip._id)
    if (index !==    -1) {
      data.data[index] = updatedTrip
      console.log('Updated data:', data.data)
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
      res.status(200).json({ message: 'Trip updated successfully' })
    } else {
      res.status(404).json({ message: 'Trip not found' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}


router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

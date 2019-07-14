const router = require('express').Router();
const Assignment = require('./../models/assignment');

router.route('/').get((req, res) => {
  Assignment.find()
    .then(assignments => res.json(assignments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Assignment.findById(req.params.id)
    .then(assignment => res.json(assignment))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/edit/:id').post((req, res) => {
  Assignment.findById(req.params.id)
    .then(assignment => {
      assignment.name = req.body.name;
      assignment.description = req.body.description;
      assignment.course = req.body.course;
      assignment.deadline = req.body.deadline;

      assignment.save()
        .then(() => res.json('Assignment is edited'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
  Assignment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Successfully deleted assignment')
    .catch(err => res.status(400).json('Error: ' + err)));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const course = req.body.course;
  const deadline = req.body.deadline;

  const assignment = new Assignment({
    name,
    description,
    course,
    deadline
  });

  assignment.save()
    .then(() => res.json(`New assignment ${name} added`))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;
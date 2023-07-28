const express = require('express');
const router = express.Router()
const uuid = require('uuid');
const members = require('../../Members');
// const bodyParser = require('body-parser');




// get all members
router.get('/', (req, res) => {

    res.json(members);
})

//gets single member
router.get('/:id', (req, res) => {
    // res.send(req.params.id);
    const found
        = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }

});
//create member ,post request using for form submission and add the data to db coming from user side
router.post('/', (req, res) => {
    //to send the body content back
    //res.send(req.body);

    //to create a member in our  database

    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'Active',
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'please include a name and email' })
    }

    members.push(newMember);
    res.json(members);

})

// to update  member we use put request. 

router.put('/:id', (req, res) => {

    const found
        = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                res.json({ msg: 'member updated', member });
            }

        })

    }
    else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }

});

// to delete a member we use delete request 

router.delete('/:id', (req, res) => {
    const found
        = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'member deleted', members: members.filter(member => member.id !== parseInt(req.params.id)) });
    }
    else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` })
    }

});

module.exports = router;
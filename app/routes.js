const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

const ObjectId = require("mongodb").ObjectId
module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  app.get('/', (req, res) => {
    db.collection('msg').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', { fact: result })

    })
  })

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    db.collection('messagesMood').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        reception: result
      })
    })
  });

  // PLAYLIST SECTION =========================

  app.get('/playlists', isLoggedIn, function (req, res) {
    let songs = [
      { songTitle: 'September', artist: 'Earth, Wind & Fire', src: 'https://www.youtube.com/embed/3cKtSlsYVEU' },
      { songTitle: 'How Deep Is Your Love', artist: 'PJ Morton', src: 'https://youtube.com/embed/IMxfoSh_XS4' },
      { songTitle: 'The Way You Look Tonight', artist: 'Frank Sinatra', src: 'https://www.youtube.com/embed/YFham2Xu6nA' },
      { songTitle: 'I Wanna Dance With Somebody', artist: 'Whitney Houston', src: 'https://www.youtube.com/embed/ynkaGd_zGwE' },
      { songTitle: 'Isnt She Lovely', artist: 'Stevie Wonder', src: 'https://www.youtube.com/embed/oE56g61mW44' },
      { songTitle: 'Put Your Records On', artist: 'Corinne Bailey Rae', src: 'https://www.youtube.com/embed/7gPD7kY1amE' },
      { songTitle: 'Your Love Keeps Lifting Me', artist: 'Jackie Wilson', src: 'https://www.youtube.com/embed/mzDVaKRApcg' },
      { songTitle: 'At Last', artist: 'Etta James', src: 'https://www.youtube.com/embed/1qJU8G7gR_g' },
      { songTitle: 'Lovely Day', artist: 'Bill Withers', src: 'https://www.youtube.com/embed/bEeaS6fuUoA' },
      { songTitle: 'Moondance', artist: 'Van Morrison', src: 'https://www.youtube.com/embed/7kfYOGndVfU' },
      { songTitle: 'Tennessee Whiskey', artist: 'Chris Stapleton', src: 'https://www.youtube.com/embed/4zAThXFOy2c' },
      { songTitle: 'Coming Home', artist: 'Leon Bridges', src: 'https://www.youtube.com/embed/5jiA-FTJ3C8' },
      { songTitle: 'Stand by Me', artist: 'Ben E. King', src: 'https://www.youtube.com/embed/vkUeWTBH1Kg' },
      { songTitle: 'Cant Take My Eyes Off Of You', artist: 'Lauryn Hill', src: 'https://www.youtube.com/embed/wVzvXW9bo5U' },
      { songTitle: 'Best Part', artist: 'Daniel Caesar ft. H.E.R.', src: 'https://www.youtube.com/embed/vBy7FaapGRo' },
      { songTitle: 'He Loves Me', artist: 'Jill Scott', src: 'https://www.youtube.com/embed/Z0OK6Ef62e4' },
      { songTitle: 'Written In The Stars', artist: 'WENDY +  John Legend', src: 'https://www.youtube.com/embed/kdVmKpwlj80' },
      { songTitle: 'By Your Side', artist: 'Sade', src: 'https://www.youtube.com/embed/mKCWHUudnmY' },
      { songTitle: 'How Sweet It Is', artist: 'Marvin Gaye', src: 'https://www.youtube.com/embed/6NcavEhEZe0' },
      { songTitle: 'Teenage Love Affair', artist: 'Alicia Keys', src: 'https://www.youtube.com/embed/ezb_zg6tiNA' },
      { songTitle: 'Dancing Queen', artist: 'ABBA', src: 'https://www.youtube.com/embed/-sVB91NTa4A' },
      { songTitle: 'Dreams', artist: 'Fleetwood Mac', src: 'https://www.youtube.com/embed/5oWyMakvQew' },
      { songTitle: 'Higher Love', artist: 'Kygo, Whitney Houston', src: 'https://www.youtube.com/embed/dTYOkcRH220' },
      { songTitle: 'Everywhere', artist: 'Fleetwood Mac', src: 'https://www.youtube.com/embed/dDLe7mbVimQ' },
      { songTitle: 'You Make My Dreams', artist: 'Daryl Hall & John Oates', src: 'https://www.youtube.com/embed/HZMQfRtTaXw' },
      { songTitle: 'I Want You Back', artist: 'Jackson 5', src: 'https://www.youtube.com/embed/jvrJSJ5wp-c' },
      { songTitle: 'Twist and Shout', artist: 'The Isley Brothers', src: 'https://www.youtube.com/embed/fuNCwPBm3fw' },
      { songTitle: 'Celebration', artist: 'Kool & the Gang', src: 'https://www.youtube.com/embed/AeTgx_pj6m8' },
      { songTitle: 'Hey Ya!', artist: 'Outkast', src: 'https://www.youtube.com/embed/jyyt0T-4dc4' },
      { songTitle: 'Good As Hell', artist: 'Lizzo', src: 'https://www.youtube.com/embed/G5xa-XAvErw' },
      { songTitle: 'I Melt With You', artist: 'Modern English', src: 'https://www.youtube.com/embed/Nmg5zP5nYO0' },
      { songTitle: 'About Damn Time', artist: 'Lizzo', src: 'https://www.youtube.com/embed/tRQe3HjZEzw' },
      { songTitle: 'Low', artist: 'Flo Rida', src: 'https://www.youtube.com/embed/dq6Q_uaJF4k' },

    ];
    db.collection('savedList').find().toArray((err1, savedsongs) => {
      db.collection('users').find().toArray((err2, result) => {
        if (err2) return console.log(err2)
        console.log(savedsongs, 'saved list')
        res.render('playlists.ejs', {
          user: req.user,
          songs: songs,
          savedsongs: savedsongs
        })
      })
    })
  });




  // RECORD SECTION =========================
  app.get('/recording', function (req, res) {
    db.collection('recordings').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('record.ejs', {
        user: req.user,
        messages: result
      })
    })
  });

  // INSPO SECTION =========================
  // app.get('/inspo', function (req, res) {
  //   db.collection('photos').find().toArray((err, result) => {
  //     if (err) return console.log(err)
  //     res.render('inspo.ejs', {
  //       user: req.user,
  //       messages: result,
  //       photos: result
  //     })
  //   })
  // });

  app.get('/inspo', (req, res) => {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('inspo.ejs', { user: req.user, messages: result })
    })
  })

  // app.post('/inspo', (req, res) => {
  //   db.collection('messages').insertOne(
  //     {
  //       thumbUp:0,
  //       thumbDown:0 }, (err, result) => {
  //     if (err) return console.log(err)
  //     console.log('saved to database')
  //     res.redirect('/inspo')
  //   })
  // })

  // source: https://www.npmjs.com/package/multer 
  const express = require('express');

  app.use(express.static(__dirname + '/public'));
  app.use('/public/data/uploads', express.static('uploads'));

  app.post('/inspo', upload.single('profile-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    console.log('trying to upload image')
    let img = {
      src: req.file.path,
      name: req.file.filename
    }
    console.log(img)
    db.collection('messages').insertOne(img)
      .then(result => {
        res.redirect('/inspo')
      })
      .catch(error => console.error(error))

  });

  //   var response = '<a href="/">Home</a><br>'
  //   response += "Files uploaded successfully.<br>"
  //   response += `<img src="${req.file.path}" /><br>`
  //   return res.send(response)
  // })

  app.delete('/inspo', (req, res) => {
    db.collection('messages').findOneAndDelete({ _id: ObjectId(req.body.id) }, (err, result) => {
      if (err) return res.send(500, err)
      console.log(err)
      res.send('Message deleted!')
    })
  })


  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // playlist routes ===============================================================
  app.post('/saveMovie', (req, res) => {
    console.log(req.body, 'request sent to post route')
    db.collection('savedList')
      .insertOne({
        songTitle: req.body.songTitle,
        artist: req.body.artist,
        moviePoster: req.body.moviePoster
      },
        (err, result) => {
          if (err) return console.log(err)
          console.log('saved to database', result)
          res.send({})
        })
  })


  app.put('/saveMovie', (req, res) => {
    db.collection('savedList')
      .findOneAndUpdate({
        songTitle: req.body.songTitle,
        artist: req.body.artist,
        moviePoster: req.body.moviePoster,
        description: req.body.description
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.delete('/deleteSave', (req, res) => {
    console.log(req.body, 'delete route hit')
    db.collection('savedList').findOneAndDelete({ _id: ObjectId(req.body.movieId) },
      function (err, result) {
        if (err) return res.send(500, err)
        res.send(result)
      })

  })
  app.post('/messages', (req, res) => {
    db.collection('messages').save({ name: req.body.name, msg: req.body.msg, smile: 0 }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/playlists')
    })
  })

  app.put('/messages', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({ name: req.body.name, msg: req.body.msg }, {
        $set: {
          love: req.body.love + 1,
        }
      }, {
        sort: { _id: -1 },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  // message board routes ===============================================================

  app.post('/messagesMood', (req, res) => {
    db.collection('messagesMood').save(
      {
        parentsIntro: req.body.parentsIntro,
        bridalParty: req.body.bridalParty,
        coupleIntro: req.body.coupleIntro,
        firstDance: req.body.firstDance,
        brideDance: req.body.brideDance,
        groomDance: req.body.groomDance,
        cakeCutting: req.body.cakeCutting,
        lastDance: req.body.lastDance,
        msg: req.body.msg
      },
      (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
  })

  app.post('/profile', (req, res) => {
    db.collection('messagesMood').insertOne(
      {
        parentsIntro: req.body.parentsIntro,
        bridalParty: req.body.bridalParty,
        coupleIntro: req.body.coupleIntro,
        firstDance: req.body.firstDance,
        brideDance: req.body.brideDance,
        groomDance: req.body.groomDance,
        cakeCutting: req.body.cakeCutting,
        lastDance: req.body.lastDance,
        msg: req.body.msg
      },
      (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
      })
  })

  // app.delete('/delete', (req, res) => {
  //   db.collection('messages').findOneAndDelete({ _id: new mongoose.mongo.ObjectID(req.body.id) }, (err, result) => {
  //     if (err) return res.send(500, err)
  //     res.send('Message deleted!')
  //   })
  // })


  // app.delete('/messages', (req, res) => {
  //   db.collection('messages').findOneAndDelete({ name: req.body.name, msg: req.body.msg }, (err, result) => {
  //     if (err) return res.send(500, err)
  //     res.send('Message deleted!')
  //   })
  // })

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) don't touch this and sign up ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

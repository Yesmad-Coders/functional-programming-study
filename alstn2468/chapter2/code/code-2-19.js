app.post('/login', function (req, res) {
  db.select('users', {
    where: { email: req.body.email },
    function(err, user) {
      function end(user) {
        req.sesson.user = user;
        res.redirect('/');
      }

      if (user && user.password === req.body.password) return end(user);

      db.insert(
        'users',
        {
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          end(user);
        }
      );
    },
  });
});

app.post('/login', function (req, res) {
  db.select('users', {
    where: { email: req.body.email },
    function(err, user) {
      if (user && user.password === req.body.password) return end(user);

      db.insert(
        'users',
        {
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          end(user);
        }
      );

      function end(user) {
        req.sesson.user = user;
        res.redirect('/');
      }
    },
  });
});

const bcrypt=require('bcryptjs');
bcrypt.hash('admin1',10).then(console.log);
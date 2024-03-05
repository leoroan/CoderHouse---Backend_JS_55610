new readme with new file structure:

src
│
├── configs
│  ├── auth
│  │  ├── github.config.js
│  │  ├── google.config.js
│  │  └── jwt.config.js
│  │
│  ├── db
│  │  ├── db.config.js
│  │  └── mongodb-singleton.js
│  │
│  └── server
│    ├── express.config.js
│    ├── http.config.js
│    └── socket.config.js
│
├── constants
│  └── salt.constant.js
│
├── controllers
│  ├── auth.controller.js
│  ├── cart.controller.js
│  ├── chat.controller.js
│  └── products.controller.js
│
├── middlewares
│  └── hasPermissions.middleware.js
│
├── models
│  ├── cart.model.js
│  ├── chat.model.js
│  ├── product.model.js
│  ├── ticket.model.js
│  └── user.model.js
│
├── public
│  ├── assets
│  └── css
│  └── js
│
├── routes
│  ├── auth.routes.js
│  ├── carts.routes.js
│  ├── messages.routes.js
│  ├── products.routes.js
│  └── view.routes.js
│
├── services
│  ├── dao
│  │  └── mongo
│  │    ├── auth.dao.js
│  │    ├── cart.dao.js
│  │    ├── chat.dao.js
│  │    └── product.dao.js
│  │
│  ├── dto
│  │  ├── cart.dto.js
│  │  ├── chat.dto.js
│  │  ├── product.dto.js
│  │  └── user.dto.js
│  │
│  ├── repository
│  │  ├── auth.repository.js
│  │  ├── cart.repository.js
│  │  ├── chat.repository.js
│  │  └── product.repository.js
│  │
│  └── factory.js
│
├── utils
│  ├── bcrypt.js
│  ├── fetch.js
│  ├── jwt.js
│  ├── mail.js
│  ├── passport.js
│  └── process.js
│
├── views
│  ├── layouts
│  ├── adminPanel.handlebars
│  ├── cart.handlebars
│  ├── chat.handlebars
│  ├── login.handlebars
│  ├── productDetail.handlebars
│  ├── products.handlebars
│  ├── profile.handlebars
│  ├── register.handlebars
│  ├── succesfullyBuy.handlebars
│  └── userProducts.handlebars
│
├── app.js
├── utils.js
└── .env.example
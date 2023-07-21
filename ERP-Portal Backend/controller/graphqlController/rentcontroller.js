const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { createHttpLink } = require("apollo-link-http");
const { HttpLink } = require("apollo-link-http");
const gql = require("graphql-tag");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

// @description           Create Rent Function
// @route                 Get api/v1/rent/create
// @access                Public
const createrent = asyncHandler(async (req, res) => {
  const user = req.user;
  const { bookId } = req.body;
  if (!bookId) {
    return res.status(403).json({
      message: "bookId cant be null",
    });
  }

  try {
    const mutation = gql`
      mutation CreateRent($rentInput: RentInput!) {
        createRent(RentInput: $rentInput) {
          id
          rentername
          renteremail
        }
      }
    `;

    const variables = {
      rentInput: {
        rentername: user.name,
        renteremail: user.email,
        books: [
          {
            book: bookId,
          },
        ],
      },
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

    client
      .mutate({ mutation, variables })
      .then((response) => {
        return res.status(200).json({
          data: response.data,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @description           Get Rent Function
// @route                 Get api/v1/rent/get
// @access                Public
const getRent = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }

  try {
    const query = gql`
      query GetRent($id: ID!) {
        getRent(ID: $id) {
          rentername
          renteremail
          books {
            book {
              title
              description
            }
            fine
          }
        }
      }
    `;

    const variables = {
      id: id,
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

    client
      .query({ query, variables })
      .then((response) => {
        return res.status(200).json({
          data: response.data,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @description           Get fine Function
// @route                 Get api/v1/fine/get
// @access                Public
const getfine = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }

  try {
    const mutation = gql`
      mutation Getfine($id: ID!) {
        getfine(ID: $id) {
          rent {
            rentername
            renteremail
            books {
              book {
                title
              }
              fine
            }
          }
          message
        }
      }
    `;

    const variables = {
      id: id,
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

    client
      .mutate({ mutation, variables })
      .then((response) => {
        return res.status(200).json({
          data: response.data,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @description           Return fine Function
// @route                 POST api/v1/rent/returnbook
// @access                Public
const returnbook = asyncHandler(async (req, res) => {
  const { id, bookId } = req.body;
  if (!id || !bookId) {
    return res.status(403).json({
      message: "id and bookId cant be null",
    });
  }

  try {
    const mutation = gql`
      mutation ReturnBook($returnBookInput: ReturnBookInput) {
        returnBook(ReturnBookInput: $returnBookInput) {
          id
          rentername
          renteremail
        }
      }
    `;

    const variables = {
      returnBookInput: {
        ID: id,
        bookId: bookId,
      },
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

    client
      .mutate({ mutation, variables })
      .then((response) => {
        return res.status(200).json({
          data: response.data,
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @description           Delete Rent Function
// @route                 DELETE api/v1/rent/delete
// @access                Private
const deleterent = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({
      message: "id cant be null",
    });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation DeleteRent($id: ID!) {
          deleteRent(ID: $id)
        }
      `;

      const variables = {
        id: id,
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });
      const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache(),
      });

      client
        .mutate({ mutation, variables })
        .then((response) => {
          return res.status(200).json({
            data: response.data,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can register students" });
  }
});

// @description           Pay fine Function
// @route                 POST api/v1/fine/pay
// @access                Public
// const payfine = asyncHandler(async (req, res) => {
//   const { id, bookId } = req.body;
//   if (!id || !bookId) {
//     return res.status(403).json({
//       message: "id or bookId cant be null",
//     });
//   }
//   try {
//     const mutation = gql`
//       mutation Payfine($returnBookInput: ReturnBookInput) {
//         payfine(ReturnBookInput: $returnBookInput) {
//           rent {
//             title
//             description
//           }
//           message
//         }
//       }
//     `;

//     const variables = {
//       returnBookInput: {
//         ID: id,
//         bookId: bookId,
//       },
//     };
//     const client = new ApolloClient({
//       link: new HttpLink({
//         uri: process.env.GRAPHQL_ENDPOINT,
//       }),
//       cache: new InMemoryCache(),
//     });

//     client
//       .mutate({ mutation, variables })
//       .then((response) => {
//         return res.status(200).json({
//           data: response.data,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = { getfine, createrent, returnbook, getRent,deleterent };

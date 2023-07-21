const { ApolloClient } = require("apollo-client");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { HttpLink } = require("apollo-link-http");
const gql = require("graphql-tag");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

// @description           Create author Function
// @route                 POST api/v1/author/create
// @access                Private
const createauthor = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(403).json({ message: "Name or email cant be null" });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation CreateAuthor($authorInput: AuthorInput!) {
          createAuthor(authorInput: $authorInput) {
            id
            name
            email
          }
        }
      `;

      const variables = {
        authorInput: {
          name: name,
          email: email,
        },
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can add authors" });
  }
});

// @description           Get author Function
// @route                 GET api/v1/author/getauthor
// @access                Public
const getauthor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({ message: "Id cant be null" });
  }

  try {
    const query = gql`
      query Author($id: ID!) {
        author(ID: $id) {
          name
          email
          books {
            title
            description
            isbn
            language
            price
            rating
          }
        }
      }
    `;

    const variables = {
      id: id,
    };
    const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @description           Update author Function
// @route                 PATCH api/v1/author/updateauthor
// @access                Private
const updateauthor = asyncHandler(async (req, res) => {
  const { name, email, id } = req.body;
  if (!name || !email || !id) {
    return res
      .status(403)
      .json({ message: "Name or email or id cant be null" });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation EditAuthor($id: ID!, $authorInput: AuthorInput) {
          editAuthor(ID: $id, authorInput: $authorInput)
        }
      `;

      const variables = {
        id: id,
        authorInput: {
          name: name,
          email: email,
        },
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can update authors" });
  }
});

// @description           Delete author Function
// @route                 DELETE api/v1/author/deleteauthor
// @access                Private
const deleteauthor = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(403).json({ message: "Id cant be null" });
  }
  if (req.isAdmin) {
    try {
      const mutation = gql`
        mutation DeleteAuthor($id: ID!) {
          deleteAuthor(ID: $id)
        }
      `;

      const variables = {
        id: id,
      };
      const link = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT, fetch });
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
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(403).json({ message: "Only admin can delete authors" });
  }
});

module.exports = { createauthor, getauthor, deleteauthor, updateauthor };

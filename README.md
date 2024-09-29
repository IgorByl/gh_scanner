# gh-scanner

# GitHub Scanner System in TypeScript

This project implements a **GitHub Scanner System** using **TypeScript** and **Apollo GraphQL**. The system is designed to fetch and display GitHub repository information and details using GitHub’s API, with considerations for rate limiting and efficient data fetching.

## Table of Contents

- [Project Requirements](#project-requirements)
- [Setup Instructions](#setup-instructions)
  - [Clone Test Repositories](#1-clone-test-repositories)
  - [Install Dependencies](#2-install-dependencies)
  - [Create Apollo Server](#3-create-apollo-server)
  - [GitHub API Integration](#4-github-api-integration)
  - [Resolvers](#5-resolvers)
  - [Concurrency Control](#6-concurrency-control)
  - [Run Locally](#7-run-locally)
- [Example Queries](#example-queries)

## Project Requirements

### Overview

The system fetches repository data from GitHub and displays it via an Apollo GraphQL server. The main functionality includes:

- **List of Repositories**: Displays basic information about repositories.
- **Repository Details**: Provides detailed information about a specific repository.

### Functional Requirements

#### 1. List of Repositories

The list of repositories should include the following details:

- **Repo name**
- **Repo size**
- **Repo owner**

#### 2. Repository Details

Detailed information for a repository should include:

- **Repo name**
- **Repo size**
- **Repo owner**
- **Public/Private status**
- **Number of files in the repo**
- **Content of one `.yml` (`.yaml`) file** (any one available in the repo)
- **Active webhooks**

### Notes

- **GitHub Access Token**: The API must accept a GitHub **Personal Access Token** to authenticate and fetch the data.
- **Concurrency Limit**: When fetching repository details, the system should only fetch details of up to **two repositories in parallel** across all requests.

### Acceptance Criteria

- Proper functionality and performance.
- Clean and readable code.
- Follow the KISS (Keep It Simple, Stupid) principle.
- The project should be launchable locally.

## Setup Instructions

### 1. Clone Test Repositories

Import the following repository into your own GitHub account under three different names (e.g., repoA, repoB, repoC) as test data:

- [https://github.com/roma8389/javascript](https://github.com/roma8389/javascript)

### 2. Install Dependencies

Make sure you have **Node.js** and **yarn** installed. Then install the required packages by running:

```bash
yarn install
```

## Local Launch Instructions

For the local launch the **serverless-offline** plugin is used.
To launch the application localy run the comman:

```bash
yarn start
```

The server is running on `http://localhost:3000`.
The GQL queries are executing on `http://localhost:3000/graphql`

## Examples

### GetRepositories query

```tsc
query GetRepositories($input: GetRepositoriesInput!) {
  getRepositories(input: $input) {
    success
    errors {
      type
      message
    }
    data {
      name
      size
      owner
    }
  }
}
```

```tsc
{
  "input": {
    "profile": {
      "owner": "IgorByl",
      "type": "USER"
    },
    "token": "**************************"
  }
}
```

```tsc
{
  "data": {
    "getRepositories": {
      "success": true,
      "errors": null,
      "data": [
        {
          "name": "123-Essential-JavaScript-Interview-Questions",
          "size": 1231,
          "owner": "IgorByl"
        },
        {
          "name": "additional_5",
          "size": 8,
          "owner": "IgorByl"
        },

        ...


        {
          "name": "markdown-here",
          "size": 16214,
          "owner": "IgorByl"
        },
        {
          "name": "mini-css-extract-plugin",
          "size": 464,
          "owner": "IgorByl"
        }
      ]
    }
  }
}
```

### GetRepositoryDetails query

```tsc
query GetRepositoryDetails($input: GetRepositoryDetailsInput!) {
  getRepositoryDetails(input: $input) {
    success
    errors {
      type
      message
    }
    data {
      name
      size
      owner
      status
      amountOfFiles
      activeWebhooks {
        type
        id
        name
        active
        events
        config {
          content_type
          insecure_ssl
          url
        }
        updated_at
        created_at
        url
        test_url
        ping_url
        deliveries_url
        last_response {
          code
          status
          message
        }
      }
      ymlContent
    }
  }
}
```

```tsc
{
  "input": {
    "owner": "IgorByl",
    "repository": "GreenridgeApp",
    "token": "**************************"
  }
}
```

```tsc
{
  "data": {
    "getRepositoryDetails": {
      "success": true,
      "errors": null,
      "data": {
        "name": "GreenridgeApp",
        "size": 29817,
        "owner": "IgorByl",
        "status": "public",
        "amountOfFiles": 13292,
        "activeWebhooks": [
          {
            "type": "Repository",
            "id": 504369905,
            "name": "web",
            "active": true,
            "events": [
              "push"
            ],
            "config": {
              "content_type": "form",
              "insecure_ssl": "1",
              "url": "https://example.com"
            },
            "updated_at": "2024-09-28T18:57:31Z",
            "created_at": "2024-09-28T18:57:31Z",
            "url": "https://api.github.com/repos/IgorByl/GreenridgeApp/hooks/504369905",
            "test_url": "https://api.github.com/repos/IgorByl/GreenridgeApp/hooks/504369905/test",
            "ping_url": "https://api.github.com/repos/IgorByl/GreenridgeApp/hooks/504369905/pings",
            "deliveries_url": "https://api.github.com/repos/IgorByl/GreenridgeApp/hooks/504369905/deliveries",
            "last_response": {
              "code": 405,
              "status": null,
              "message": "Invalid HTTP Response: 405"
            }
          }
        ],
        "ymlContent": "apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: Q0FEQVRB \n    server: http://example.com \n  name: cluster1 \n- cluster:\n    certificate-authority-data: Q0FEQVRBMg==\n    server: http://example2.com\n    insecure-skip-tls-verify: true\n  name: cluster2\n\ncontexts:\n- context:\n    cluster: cluster1 \n    user: user1\n  name: context1 \n- context:\n    cluster: cluster2\n    namespace: namespace2\n    user: user2\n  name: context2\n- context:\n    cluster: cluster2\n    user: user3\n  name: passwd\n\ncurrent-context: context2 \nkind: Config\npreferences: {}\nusers:\n- name: user1\n  user:\n    client-certificate-data: VVNFUl9DQURBVEE=\n    client-key-data: VVNFUl9DS0RBVEE=\n- name: user2\n  user:\n    client-certificate-data: VVNFUjJfQ0FEQVRB\n    client-key-data: VVNFUjJfQ0tEQVRB\n- name: user3\n  user:\n    username: foo\n    password: bar"
      }
    }
  }
}
```

### Notes

- [Bruno API](https://docs.usebruno.com/introduction/what-is-bruno) collection is added in the repository.

## Future Improvements

- add guards for github api contract checking
- add more unit tests
- add custom logger
- add possibility to deploy

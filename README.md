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
- **Content of one `.yml` file** (any one available in the repo)
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

Make sure you have **Node.js** and **npm** installed. Then install the required packages by running:

```bash
npm install
```

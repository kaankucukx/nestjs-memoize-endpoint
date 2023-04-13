# NestJS Memoize Endpoint

NestJS Memoize is a simple package that provides a decorator for caching the results of your NestJS endpoints. This can help reduce response time and server load when dealing with slow APIs or databases. The
decorator, `Memoize`, allows you to specify how long the results should be stored in the cache.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Custom Cache Duration](#custom-cache-duration)
- [How It Works](#how-it-works)

## Installation

To install the package, open your terminal or command prompt, navigate to your NestJS project folder, and run the following command:

```bash
npm install nestjs-memoize-endpoint
```

This command installs the nestjs-memoize-endpoint package into your project, making it available for use.

# Usage

To use the Memoize decorator in your NestJS project, you'll need to import it and then apply it to the endpoint methods you'd like to cache.

## Basic Example

Here's a simple example showing how to use the Memoize decorator:

````typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize()
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}

````

In this example, we imported the Memoize decorator from the nestjs-memoize-endpoint package and applied it to the getData method. By default, the decorator will cache the results for 5 minutes (300,000 milliseconds).

## Custom Cache Duration

You can also set a custom cache duration by providing the ttl parameter (time-to-live) in milliseconds. The following example sets the cache duration to 1 minute (60,000 milliseconds):

```typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize(60000) // Cache the result for 1 minute
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}

```

## Handling Multiple Parameters

The Memoize decorator can handle multiple parameters in your endpoint methods. It creates a cache key based on the input parameters, ensuring that each unique combination of parameters gets its own cache entry.

Here's an example with multiple parameters:

````typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize(60000) // Cache the result for 1 minute
  async getData( param1: string, param2: number ): Promise<any> {
    // Fetch data from a slow API or database based on the input parameters
  }
}

````

## How It Works

When you use the Memoize decorator, it checks if there is a cached result for the given method and input parameters. If a cached result exists and it's still within the specified cache duration (the ttl value), the
decorator returns the cached result instead of calling the original method.

This helps reduce the time it takes to respond to requests and can also help reduce the load on your server by avoiding repetitive calls to slow APIs or databases.

Remember to use the Memoize decorator responsibly, as caching can lead to outdated information being returned if the data changes frequently. Use it for endpoints where the data doesn't change often, and the performance
benefits outweigh the risk of returning slightly outdated information.

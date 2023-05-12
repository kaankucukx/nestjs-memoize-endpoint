NestJS Memoize Endpoint
=======================

NestJS Memoize is a robust package providing a decorator for caching results from your NestJS endpoints. This significantly reduces response time and server load when dealing with slow APIs or databases. The Memoize decorator allows you to specify the duration for which results should be stored in the cache. Additionally, the package now supports a custom cache capacity and verbose logging for debugging purposes.

Table of Contents
-----------------

*   [Installation](#installation)
*   [Usage](#usage)
*   [Basic Example](#basic-example)
*   [Custom Cache Duration and Capacity](#custom-cache-duration-and-capacity)
*   [Verbose Logging](#verbose-logging)
*   [How It Works](#how-it-works)

Installation
------------

Open your terminal or command prompt, navigate to your NestJS project folder, and run the following command:


```bash
npm install nestjs-memoize-endpoint
```

This command installs the nestjs-memoize-endpoint package into your project.

Usage
-----

Import the Memoize decorator and apply it to the endpoint methods you want to cache.

Basic Example
-------------

Here's how to use the Memoize decorator:

```typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize()
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}
```

Custom Cache Duration and Capacity
----------------------------------

Set a custom cache duration (ttl - time-to-live) in milliseconds and the maximum number of entries in the cache (capacity). The following example sets the cache duration to 1 minute (60,000 milliseconds) and the cache capacity to 1000 entries:

```typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize({ ttl: 60000, capacity: 1000 }) // Cache the result for 1 minute and allow a maximum of 1000 entries
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}
```

Verbose Logging
---------------

You can enable verbose logging to help debug cache hits and misses. When verbose is set to true, the decorator logs cache operations to the console:


```typescript
import { Memoize } from 'nestjs-memoize-endpoint';

class MyController {
  @Memoize({ ttl: 60000, capacity: 1000, verbose: true }) // Verbose logging enabled
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}
```

How It Works
------------

When using the Memoize decorator, it checks for a cached result for the given method and input parameters. If a cached result exists and it's still within the specified cache duration (ttl value), the decorator returns the cached result instead of calling the original method.

Use the Memoize decorator responsibly as caching can lead to outdated information being returned if the data changes frequently. It's best used for endpoints where the data doesn't change often, and the performance benefits outweigh the risk of returning slightly outdated information.
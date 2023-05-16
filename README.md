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

The `@Memoize` decorator should be placed directly above the function it's intended to cache. If there are other decorators placed between the `@Memoize` decorator and the original function, this will lead to errors as the `@Memoize` decorator may end up caching the wrong function or data.

Incorrect usage:


```typescript
import { Memoize } from 'nestjs-memoize-endpoint';
import { CustomDecorator } from 'path-to-custom-decorator';

class MyController {
  @Memoize() // Incorrect placement. Memoize should be the closest decorator to the function.
  @CustomDecorator()
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}
```

In the above example, the `@Memoize` decorator is placed after the `@CustomDecorator`. This will cause the `@Memoize` decorator to cache the result of the `@CustomDecorator` instead of the `getData` function, leading to unexpected results.

Correct usage:


```typescript
import { Memoize } from 'nestjs-memoize-endpoint';
import { CustomDecorator } from 'path-to-custom-decorator';

class MyController {
  @CustomDecorator()
  @Memoize() // Correct placement. Memoize is the closest decorator to the function.
  async getData(): Promise<any> {
    // Fetch data from a slow API or database
  }
}
```

In this correct example, the `@Memoize` decorator is placed directly above the `getData` function, ensuring that it's the `getData` function result that's being cached. Any other decorators can be placed above the `@Memoize` decorator.

This rule applies to all kinds of decorators in NestJS, not just `@Memoize`. The decorator that's intended to modify the function should always be placed closest to the function. This ensures the decorator acts upon the correct function and data, preventing any potential errors or unexpected behavior.

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

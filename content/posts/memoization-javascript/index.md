---
title: Learning about Memoization
description: A real world application on how Memoization can be used
slug: learning-about-memoization
date: 2025-04-20 00:00:01+0000
categories:
    - Code Category
tags:
    - code
    - javascript
    - Memoization
---

What's memoization all about? First off, memoization is a technique where you cache the results of expensive function calls so that when the same input occur again, you can return the cached result instead of recalculating it again.

Let's get into a simple example of this.

`
// Without memoization

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
`

This simple example is expensive because this recursive function will run for whatever the value N is. Specifically, this function has a time complexity of O(2^n). This means that the speed of this function will exponentially grow for each call it has to make. 

For example, if we say `n` is equal to 8 then this function would be called 54 times! That's a lot!

Now if I were to improve the performance of this method by using memoization, I would want to include a cache within the function that would hold all previous attempts. Let's see how this is implemented

`
function memoizedFibonacci() {
  const cache = {}; // Setting up the cache

  return function(fib(n)) {
    if (n in cache) {
      return cache[n]; // This is the cached result
    }

    if (n <= 1) {
      cache[n] = n;
    } else {
      cache[n] = fib(n - 1) + fib(n - 2); 
      // Once it's called, it's saved!
    }

    return cache[n]
  }
}

const fibWithMemo = memoizedFibonacci();
`

So much better! Now if we were to say that n is equal to 8 for this method, it would be change the time complexity to O(n). A significant improvement! Now this results in 9 function calls! To put it another way, the number of calls grow linearly instead of exponentially.


---

Let's expand on this and see how this can be used in the real world!.

We're going to write a function that fetches data from some API.

`
// Simulating an API call
function fetchUserData(userId) {
  
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        /// ... more user data
      });
    }, 300) // Simulating network delay.
  })
}

function createMemoizedFetcher() {
  const cache = {};

  return async function(userId) {
    if (userId in cache) {
      // Returning cached data
      return cache[userId];
    }

    const userData = await fetchUserData(userId);

    // Storing data in the cache.
    cache[userId] = userData;

    return userData;
  }
}
`

This is great! We can see that memoization is a great use case for reducing redundant API calls to the backend which makes the application run faster. This end up reduces the load on the backend as well.

We can continue to improve upon this! We can introduce an expiry time to each cached element. Along with keeping things efficient, we are also making sure that the data we are requesting doesn't go stale. 

Let's implement this:

`
function createMemoizedFetcherWithExpiry(expiryTimeMs = 60000) {
  const cache = {};

  return async function(userId) {
    const now = Date.now();

  
    if (userId in cache && now - cache[userId].timestamp < expiryTimeMs) {
      // Returning cached data
      return cache[userId].data;
    }

    const userData = await fetchUserData(userId);

    // Storing data in the cache.
    cache[userId] = {
      data: userData,
      timestamp: now
    }

    return userData;
  }
}

---

Generally memoization is a good pattern to use when:

- You have expensive recursive functions
- You have a function that are performing costly operations repeatedly with the same inputs
- API calls and network requests
- Parsing and processing large data
- UI rendering optimizations

and for some real world examples
- user data processing
- Form validation
- Search functions
- Rendering complex UI components
- Route calculations (? what)

---

Memoization isn't always the answer! Here's a few times when it's not a good pattern to implement:

- Simple, fast operations
- Using impure functions
- Inputs that are rarely repeated
- Time sensitive or real time data.
- If the cached results consumes more memory than what it costs to compute


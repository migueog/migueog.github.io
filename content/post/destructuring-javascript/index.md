---
title: Learning about Destructuring
description: A real world application on how destructuring can be used
slug: destructuring-real-world-application
date: 2025-01-05 00:00:00+0000
image: cover.jpg
categories:
    - Javascript
tags:
    - javascript, destructuring
weight: 1       # You can add weight to some posts to override the default sorting (date descending)
---

I'm starting the new year with refreshing and solidifying some Javascript and programming fundamentals. I've been reading up about destructuring and I want to write about what a real world application of this concept would be. I find that providing a real world example is necessary to understand why and how this can be used.

Let's do a quick recap:

Destructuring is a tool that is used to unpack values from arrays or objects into distinct variables. Here are two examples of how it can be used:

This following example is used to unpack the values from an object that when received, it looks a bit complicated and excessive but once we destructure the objects, they can be transformed into something much easier to read and understand their intent.

```
const response = {
  data: {
    user: {
      profile: {
        name: 'John',
        email: 'john@example.com'
      }
    }
  }
};

// Without destructuring
console.log(response.data.user.profile.name);  // Output: "John"
console.log(response.data.user.profile.email); // Output: "john@example.com"

// With destructuring
const { data: { user: { profile: { name, email } } } } = response;
console.log(name);   // Output: "John"
console.log(email);  // Output: "john@example.com"
```
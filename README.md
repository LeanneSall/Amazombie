## FrontEnd Project

##### Designed and programmed by _CTRL ALT DEFEAT_
Patrick Fortaleza, Gokay Abay, Leanne Sall, Nick Charvat, Tilman Queitsch

## Project Description

Amazombie is an ecommerce website offering apocalypse prepper boxes and crates for the end-of-the-world-conscious minds / brains that don't want to be eaten. With three tiers to choose from our customers know that whatever comes they will be ready for anything.

## Typical User Persona

Rick Mortar is a 36-year-old property manager in rural Alberta. He earns roughly $60,000 pre-tax per year, enjoys zombie movies and likes playing Fallout. The events in 2020 have Rick worried that it won't be long before the undead come marching to his own porch, and the government won't keep them at bay for him. Armed with the powers of the Internet, Rick opens his browser and heads to Amazombie.

## Functional Description

On our site, Rick (our typical user) is greeted by a landing page that explains how Amazombie works. He can view the contents of previous boxes, add and remove boxes to their cart, fill out a validated form on the shopping cart page and proceed to the order confirmation site. 

## Style

We decided on a dark and gloomy but not too gory or explicit look. Dark black and grey colours combined with uniform-inspired greens make for a layout that is apocalyptic yet professional. White and dark ruby are often used throughout the page to easily create contrast and highlight page elements. 

## Prototype

We used [Figma](https://www.figma.com/file/pI2MN5wUnZgQRiL5BoRtGJ/amazombie?node-id=0%3A1) for our prototype.

## Technology & Components

HTML, SASS, jQuery, Vanilla JS, Bootstrap.

## Contents
 - [Home Page](https://pfteza-dev.com/amazombie/index.html)
 - [Login](https://pfteza-dev.com/amazombie/login.html) / [Register pages](https://pfteza-dev.com/amazombie/register.html)
 - [Overview of all boxes](https://pfteza-dev.com/amazombie/shopAll.html)
 - [Tier A Box Page](https://pfteza-dev.com/amazombie/SinglePageA.html)
 - [Tier B Box Page](https://pfteza-dev.com/amazombie/SinglePageB.html)
 - [Tier C Box Page](https://pfteza-dev.com/amazombie/SinglePageC.html)
 - [Shopping Cart](https://pfteza-dev.com/amazombie/shoppingcart.html)
 - [Order Confirmation Page](https://pfteza-dev.com/amazombie/order-confirmation.html) (for the purposes of this project this page is will appear blank with an empty cart)

 ## Spotlight: Shopping Cart Feature

 This feature allows Rick to add boxes to his cart. He can do so from the Shopping Page or each of the individual Tier Box pages. The items are saved in local storage, the dollar amount in the header and the pages that should display cart contents are populated based on local storage objects. 

 ## Spotlight: Shopping Cart Form Validation

Once (trigger) happy with his cart contents, Rick move on to the Shopping Cart page through the header. The contents here are prepopulated using a dummy user (not Rick), but he can edit using the pencil icon.  Here can either sync up his shipping address with the billing address with a checkbox on the summary form or enter a different address. A couple regex validations ensure that his name, credit card info and address run through some checks before he can proceed to the Order Confirmation page.

Link Picture Single Page
https://unsplash.com/photos/_OQ8Jc7kBmA

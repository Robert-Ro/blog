# Model–view–viewmodel

**Model–view–viewmodel (MVVM)** is a software architectural pattern that facilitates the separation of the development of the graphical user interface (the view) – be it via a markup language or GUI code – from the development of the business logic or back-end logic (the model) so that the view is not dependent on any specific model platform.

**MVVM** is a variation of Martin Fowler's Presentation Model design pattern.It was invented by Microsoft architects Ken Cooper and Ted Peters specifically to **simplify event-driven programming** of user interfaces.

**Model–view–viewmodel** is also referred to as **model–view–binder**,
example: KnockoutJS (a JavaScript library) use model–view–binder.

![](../assets/image/MVVMPattern.png)

## Components of MVVM pattern

### Model 数据层

Model refers either to a domain model, which represents real state content (an object-oriented approach), or to the data access layer, which represents content (a data-centric approach).

### View 视图层

As in the **model–view–controller** (MVC) and **model–view–presenter** (MVP) patterns, the view is the structure, layout, and appearance of what a user sees on the screen. It **displays a representation of the model** and **receives the user's interaction with the view** (**mouse clicks**, **keyboard input**, **screen tap gestures**, etc.), and it forwards the handling of these to the view model via the data binding (properties, event callbacks, etc.) that is defined to link the view and view model.

### View model

The **view model** is an abstraction of the view exposing public properties and commands. Instead of the controller of the MVC pattern, or the presenter of the MVP pattern, MVVM has a binder, which automates **communication between the view and its bound properties** in the **view model**. The **view model** has been described as a state of the data in the model.

The main difference between the **view model** and the Presenter in the MVP pattern is that *the presenter has a reference to a view*, whereas the **view model** does not. Instead, a view directly binds to properties on the **view model** to send and receive updates. To function efficiently, this requires a **binding technology** or generating boilerplate code to do the binding.

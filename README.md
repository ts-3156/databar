# Databar plug-in for jQuery

jquery.databar - jQuery plugin for Excel-style data bar.


## Demo

1. download this repository
1. double click examples/demo.html

![Demo](/examples/demo.png)


## Installation

In most cases, to use Databar all you need to do is include jQuery, the Databar Javascript file in your HTML page:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="jquery.databar.js"></script>
```


## Usage

In its simplest case, Databar can be initialised with a single line of Javascript:

```js
$('table').databar();
```

If you specify "databar-ignore" on td tag's class name, Databar ignore the cell:

```html
<td class="databar-ignore">...</td>
```

where the jQuery selector is used to obtain a reference to the table you want to enhance with Databar. Optional configuration parameters can be passed in to Databar to have it perform certain actions by using a configuration object as the parameter passed in to the Databar constructor. For example:

```js
$('table').databar( {
  backgroundOpacity: 0.1
} );
```


## License

Databar is release under the [MIT license](//github.com/ts-3156/databar/blob/master/LICENSE). You are free to use, modify and distribute this software, as long as the copyright header is left intact (specifically the comment block which starts with `/*!`.

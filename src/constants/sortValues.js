const SORT_VALUES = [
    {"id" : "1", "data-value" : "price: all", "data-text" : "All", value : [0, Infinity]},
    {"id" : "2", "data-value" : "price: low", "data-text" : `0 ${String.fromCharCode(8249)} price ${String.fromCharCode(8249)} 15`, value : [0, 15]},
    {"id" : "3", "data-value" : "price: medium", "data-text" : `15 ${String.fromCharCode(8249)} price ${String.fromCharCode(8249)} 30`, value : [15, 30]},
    {"id" : "4", "data-value" : "price: high", "data-text" : `price ${String.fromCharCode(8250)} 30`, value : [30, Infinity]}
]

export { SORT_VALUES }
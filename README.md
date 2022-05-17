# node-merkle-tree

This is a sample project to build merkle tree and validate hash with nodejs

## Usage 

create tree
```console
yarn create-tree
```
This will create a merkle_tree file which stored all the merkle trees

validate
```
yarn validate
```
This will validate the txid 

## How it works

- create-tree

This will generate three trees from the data, and store them in database `merkle_tree`. And also gererate a mapping for each `txid` in data to the `merkle_tree` and store them in `tree_map`

- validate

This will query the `tree_map` by txid to get tree's index, then use the index to guery `merkle_tree` to get the tree. Then do the validation process.

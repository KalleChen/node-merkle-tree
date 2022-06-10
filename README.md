# node-merkle-tree

This is a sample project to build merkle tree and validate hash with nodejs

## Usage 

```console
docker compose up -d
```

> Without docker
> ```console
> yarn install
> yarn dev
> or 
> yarn start
> ```

The backend server will host on port 3000

## API

### Upload hashes

- Endpoint
```
/upload
```

- Method
```
POST
```

- Body example
```json
{
  "hashes": ["hash1", "hash2", "hash3"]
}
```

- Response
```json
{
  "merkle_tree_id": "xxx",
  "root": "xxx"
}
```

### Validation

- Endpoint
```
/validate
```

- Method
```
GET
```

- Params
```
hash: the txid
merkle_tree_id: tree's id
```

- Response
```json
{
  "validation_result": "true/false"
}
```

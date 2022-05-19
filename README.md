# node-merkle-tree

This is a sample project to build merkle tree and validate hash with nodejs

## Usage 

```console
docker compose up -d
```

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
  hashes: ["hash1", "hash2", "hash3"]
}
```

- Response
```json
{
  "merkle_tree_id": xxx
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

- Body example
```json
{
  "hash": xxx,
  "merkle_tree_id": xxx
}
```

- Response
```json
{
  "validation_result": true/false
}
```

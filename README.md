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

- Body example
```json
{
  hashes: ["hash1", "hash2", "hash3"]
}
```

### Validation

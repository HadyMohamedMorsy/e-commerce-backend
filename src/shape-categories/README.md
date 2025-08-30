# Shape Categories API

## Endpoints

### GET /shape-categories/grouped

Returns shape categories grouped by type and shapeType, with all names under each group.

#### Response Format

```json
[
  {
    "id": 1,
    "type": "Layer_4",
    "shapeType": "normal",
    "items": ["Round Face", "Oval Face", "Square Face"]
  },
  {
    "id": 2,
    "type": "Layer_4",
    "shapeType": "slim",
    "items": ["Long Face", "Heart Face"]
  },
  {
    "id": 3,
    "type": "Layer_2",
    "shapeType": "normal",
    "items": ["Triangle Face", "Diamond Face"]
  }
]
```

#### Description

This endpoint groups shape categories by their `type` and `shapeType` combinations. Each group contains:

- `id`: The ID of the first category in that group
- `type`: The facial feature type (e.g., "Layer_4", "Layer_2")
- `shapeType`: The shape type (e.g., "normal", "slim", "slim-2", etc.)
- `items`: An array of all names that belong to that type and shapeType combination

The data is ordered by type, then shapeType, then name for consistent results.

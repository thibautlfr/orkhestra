https://fastapi.tiangolo.com/#typer-the-fastapi-of-clis

```zsh
pip install -r requirements.txt

pip install "fastapi[standard]"
pip install uvicorn

<!-- pip install 'strawberry-graphql[debug-server]' -->
pip install 'strawberry-graphql[debug-server]'
pip install 'strawberry-graphql[fastapi]'

source .venv/bin/activate

python3 -m database.init_db
python3 -m database.fixtures
```

## Commandes de lancement

```zsh
strawberry server schema
fastapi dev main.py
uvicorn main:app --reload
```

Accès aux interfaces graphiques :

- localhost:8000/docs
- localhost:8000/graphql

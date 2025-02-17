from collections import defaultdict
from database.models import TaskModel


class TaskLoader:
    def __init__(self, db):
        self.db = db
        self.cache = {}

    # Load tasks for multiple projects
    def load_tasks(self, project_ids):
        # Load only the project_ids not yet cached
        project_ids_to_load = [pid for pid in project_ids if pid not in self.cache]
        if project_ids_to_load:
            tasks = (
                self.db.query(TaskModel)
                .filter(TaskModel.project_id.in_(project_ids_to_load))
                .all()
            )
            grouped = defaultdict(list)
            for task in tasks:
                grouped[task.project_id].append(task)
            for pid in project_ids_to_load:
                self.cache[pid] = grouped.get(pid, [])
        return [self.cache.get(pid, []) for pid in project_ids]

    # Load all tasks for a project
    def load(self, project_id):
        return self.load_tasks([project_id])[0]

from os import environ

CONFIG_FILE = environ.get('CONFIG_FILE')


class Config:
    def __init__(self, name: str, app_id: str, secret: str, server: str, port: int, use_ssl: bool, username: str,
                 password: str):
        self.name = name
        self.app_id = app_id
        self.secret = secret
        self.server = server
        self.port = port
        self.use_ssl = use_ssl
        self.username = username
        self.password = password

    def __str__(self):
        return self.__dict__.__str__()


def load_from_yaml(filename):
    import yaml
    doc = yaml.load(open(filename, 'r'))
    apps = {}
    for e in doc['applications']:
        config = Config(name=e['name'],
                        app_id=e['appId'],
                        secret=e['secret'],
                        server=e['connection']['server'],
                        port=e['connection']['port'],
                        use_ssl=e['connection']['ssl'],
                        username=e['credentials']['username'],
                        password=e['credentials']['password'])
        apps[config.app_id] = config
    return apps

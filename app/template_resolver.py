import requests as rq


class TemplateResolver:
    def __init__(self, app):
        self.app = app
        self.cache = {}

    def resolve(self, url):
        logger = self.app.logger
        if url not in self.cache:
            logger.info(f"Fetching template from: {url}")
            try:
                res = rq.get(url)
                if res.status_code == rq.codes.ok:
                    self.cache[url] = res.text
                else:
                    raise Exception(f"Received non OK code: {res.status_code}")
            except Exception as e:
                logger.error(f"Failed to fetch a template: {e}")
                raise
        return self.cache[url]

import requests as rq

class TemplateResolver:
	def __init__(self, app):
		self.app = app
		self.cache = {}


	def resolve(self, url):
		if not url in cache:
			app.logger.info(f"Fetching template from: {url}")
			res = rq.get(url)
			# TODO: handle error
			cache[url] = res.text
		return cache[url]

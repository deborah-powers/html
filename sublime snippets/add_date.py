#!/usr/bin/python3.10
# -*- coding: utf-8 -*-
import time
import datetime
import sublime_plugin

class AddDateCommand (sublime_plugin.TextCommand):
	def run (self, edit):
		utcOffsetSec = None
		if time.localtime().tm_isdst: utcOffsetSec = time.altzone
		else: utcOffsetSec = time.timezone
		utcOffset = datetime.timedelta (seconds=-utcOffsetSec)
	#	dateStr = datetime.datetime.now().replace (tzinfo=datetime.timezone (offset=utcOffset)).strftime ('%Y-%m-%dT%H:%M%z')
		dateStr = datetime.datetime.now().replace (tzinfo=datetime.timezone (offset=utcOffset)).strftime ('%Y/%m/%d')
		dayStr = '======================== %s ========================' % dateStr
		self.view.run_command ('insert_snippet', { 'contents': dayStr })


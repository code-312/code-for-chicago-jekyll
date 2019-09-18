---
layout: post
title: Cannabis Cases
description: Building a heatmap of Cannabis Cases in Chicago
category: Data Projects
published: true
date: 2019-09-09 00:09:00-05:00
---

# Cannabis Cases
By: [Jordan Nelson](https://github.com/monadnoc) and [Zak Patterson](https://github.com/zakpatterson)

Code for America and Cook County [recently announced a partnership](https://abc7chicago.com/kim-foxx-announces-code-for-america-partnership-to-expunge-marijuana-convictions/5495661/) to build tools to automatically expunge criminal records for those with cannabis convictions and arrests. This builds upon Code for America's prior success automatically expunging thousands of criminal records in California with [Clear My Record](https://www.codeforamerica.org/programs/clear-my-record).

## Sources

The City of Chicago makes [this data available to you](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2/data) to analyze on your own.

## Methods 
Volunteer members of the Code for Chicago Brigade built a heatmap of cannabis arrests in Chicago covering 2001 to present. The map below was built with Tableau and filters all arrest data for indicators relating to cannabis to come up with over 300,000 arrest records. This filter is quite unrestricted, returning any arrests with "cannabis" in the description. (Not all of these necessarily eligible for expungement). Future work towards transparent and repeatable data processing will be performed in this [Github repo](https://github.com/monadnoc/IL_cannabis_expungement)  

## A Map of Arrest Activity

[Explore the map here](https://public.tableau.com/profile/jordan.nelson6050#!/vizhome/chicago_arrests_description_contains_cannabis_since2001/Back-of-the-Yards)

{% include cannabis_arrests/tableau_snippet.html %}

If this kind of work interests you, we'd love to have you at a meetup, or join our slack channel. Check out our links on our main page.

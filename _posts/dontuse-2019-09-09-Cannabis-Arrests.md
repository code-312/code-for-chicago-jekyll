---
title: Cannabis Cases
date: 2019-09-09 05:09:00 Z
category:
- Data Projects
layout: post
description: Building a heatmap of Cannabis Cases in Chicago
---

# Cannabis Cases
By: [Jordan Nelson](https://github.com/monadnoc) and [Zak Patterson](https://github.com/zakpatterson)

Code for America and Cook County [recently announced a partnership](https://abc7chicago.com/kim-foxx-announces-code-for-america-partnership-to-expunge-marijuana-convictions/5495661/) to build tools to automatically expunge criminal records for those with cannabis convictions and arrests. This builds upon Code for America's prior success automatically expunging thousands of criminal records in California with [Clear My Record](https://www.codeforamerica.org/programs/clear-my-record).

## Sources

The City of Chicago makes [this data available to you](https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present/ijzp-q8t2/data) to analyze on your own.

## Methods 
Volunteer members of the Code for Chicago Brigade built a heatmap of cannabis arrests in Chicago covering 2001 to present. The map below was built with Tableau [densit marks](https://www.tableau.com/about/blog/2018/11/density-mark-type-brings-new-kind-heatmap-tableau-98488) after filtering all arrest data for indicators relating to cannabis. The data filter is for all arrests described as being for possession of cannabis, 30g or less. This level of posession will be legal in IL on Jan. 1, 2020. 

The data workup used as input for the Tableau visualization is currently in a [Jupyter notebook](https://github.com/monadnoc/IL_cannabis_expungement/blob/master/Chi_cannabis_expungement/notebooks/chicago_arrest_data.ipynb), and future work towards transparent and repeatable data processing will be performed in this [Github repo](https://github.com/monadnoc/IL_cannabis_expungement)  

## A Map of Arrest Activity

[Explore the map here](https://public.tableau.com/views/ChicagoMapofArrestssince2001forPossessionofCannabis30gorLess/Sheet1?:embed=y&:display_count=yes&publish=yes&:origin=viz_share_link)

{% include cannabis_arrests/tableau_snippet.html %}

If this kind of work interests you, we'd love to have you at a meetup, or join our slack channel. Check out our links on our main page.

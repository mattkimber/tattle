# Tattle

Tattle is a platform for writing chatbots. It is based on categorising abitrary text input into two
different entities:

* Intent
* Parameters

The idea is that you can then write handlers for each *intent* (e.g. "find a lounge") and have it passed
a dictionary of *parameters* (which might be something like { airport: LGW, terminal: S }).

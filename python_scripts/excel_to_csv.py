import pandas as pd

read_file = pd.read_excel (r'/home/jstet/Documents/Anmeldung zum HACK AND HARVEST 2022 (Antworten) - Formularantworten 1.xls')
read_file.to_csv ("/home/jstet/Documents/sdd.csv", index = None, header=True)

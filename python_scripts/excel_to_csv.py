import pandas as pd

read_file = pd.read_excel (r'/home/jstet/Downloads/20220604-data-days-anmeldungen.xlsx')
read_file.to_csv ("/home/jstet/Documents/sdd.csv", index = None, header=True)

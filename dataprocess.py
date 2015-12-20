import csv
import json

years = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015]
useData = {}
for year in years:
    filename = 'annual_all_' + str(year) + '.csv'
    with open(filename, 'rU') as csvfile:
        data = csv.reader(csvfile, delimiter=',', quotechar='"')
        next(data, None)
        stateData = {}
        pData = {}
        stateNumPrev = 1
        stateNamePrev = 'Alabama'
        loop = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        co = 0
        so2 = 0
        noy = 0
        no = 0
        no2 = 0
        nox = 0
        ozone = 0
        pm10 = 0
        pm25 = 0
        for line in data:
            if int(line[0]) > 75:
                break
            if not line[-2]:
                continue
            if int(line[0]) != stateNumPrev:
                for i in range(9):
                    if loop[i] == 0:
                        loop[i] = 1
                pData['co'] = format(co/float(loop[0]), '.2f')
                pData['so2'] = format(so2/float(loop[1]), '.2f')
                pData['noy'] = format(noy/float(loop[2]), '.2f')
                pData['no'] = format(no/float(loop[3]), '.2f')
                pData['no2'] = format(no2/float(loop[4]), '.2f')
                pData['nox'] = format(nox/float(loop[5]), '.2f')
                pData['ozone'] = format(ozone/float(loop[6]), '.2f')
                pData['pm10'] = format(pm10/float(loop[7]), '.2f')
                pData['pm25'] = format(pm25/float(loop[8]), '.2f')
                stateData[stateNamePrev] = pData
                stateNumPrev = int(line[0])
                stateNamePrev = line[-1]
                co = 0
                so2 = 0
                noy = 0
                no = 0
                no2 = 0
                nox = 0
                ozone = 0
                pm10 = 0
                pm25 = 0
                loop = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            if line[1] == '42101':
                co += float(line[-2])
                loop[0] += 1
            elif line[1] == '42401':
                so2 += float(line[-2])
                loop[1] += 1
            elif line[1] == '42600':
                noy += float(line[-2])
                loop[2] += 1
            elif line[1] == '42601':
                no += float(line[-2])
                loop[3] += 1
            elif line[1] == '42602':
                no2 += float(line[-2])
                loop[4] += 1
            elif line[1] == '42603':
                nox += float(line[-2])
                loop[5] += 1
            elif line[1] == '44201':
                ozone += float(line[-2])
                loop[6] += 1
            elif line[1] == '85101':
                pm10 += float(line[-2])
                loop[7] += 1
            elif line[1] == '88101':
                pm25 += float(line[-2])
                loop[8] += 1
        for i in range(9):
            if loop[i] == 0:
                loop[i] = 1
        pData['co'] = format(co/float(loop[0]), '.2f')
        pData['so2'] = format(so2/float(loop[1]), '.2f')
        pData['noy'] = format(noy/float(loop[2]), '.2f')
        pData['no'] = format(no/float(loop[3]), '.2f')
        pData['no2'] = format(no2/float(loop[4]), '.2f')
        pData['nox'] = format(nox/float(loop[5]), '.2f')
        pData['ozone'] = format(ozone/float(loop[6]), '.2f')
        pData['pm10'] = format(pm10/float(loop[7]), '.2f')
        pData['pm25'] = format(pm25/float(loop[8]), '.2f')
        stateData[stateNamePrev] = pData
        useData[year] = stateData
    csvfile.close()
with open('pollution_data.json', 'w') as outfile:
    json.dump(useData, outfile, indent=4, sort_keys=True)

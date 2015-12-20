import csv
import json
import numpy

years = [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
useData = {}
yearMax = {}
yearMin = {}
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
        comean = []
        so2mean = []
        noymean = []
        nomean = []
        no2mean = []
        noxmean = []
        ozonemean = []
        pm10mean = []
        pm25mean = []
        coall = []
        so2all = []
        noyall = []
        noall = []
        no2all = []
        noxall = []
        ozoneall = []
        pm10all = []
        pm25all = []
        for line in data:
            if int(line[0]) > 70:
                break
            if not line[-2]:
                continue
            if int(line[0]) != stateNumPrev:
                for i in range(9):
                    if loop[i] == 0:
                        loop[i] = 1
                # if co == 0 and year != 2005:
                #     pData['co'] = float(format(useData[year-1][int(stateNumPrev)]['pollutant']['co'], '.2f'))
                # else:
                pData['co'] = float(format(co/float(loop[0]), '.2f'))
                pData['so2'] = float(format(so2/float(loop[1]), '.2f'))
                pData['noy'] = float(format(noy/float(loop[2]), '.2f'))
                pData['no'] = float(format(no/float(loop[3]), '.2f'))
                pData['no2'] = float(format(no2/float(loop[4]), '.2f'))
                pData['nox'] = float(format(nox/float(loop[5]), '.2f'))
                pData['ozone'] = float(format(ozone/float(loop[6]), '.2f'))
                pData['pm10'] = float(format(pm10/float(loop[7]), '.2f'))
                pData['pm25'] = float(format(pm25/float(loop[8]), '.2f'))
                comean.append(pData['co'])
                so2mean.append(pData['so2'])
                noymean.append(pData['noy'])
                nomean.append(pData['no'])
                no2mean.append(pData['no2'])
                noxmean.append(pData['nox'])
                ozonemean.append(pData['ozone'])
                pm10mean.append(pData['pm10'])
                pm25mean.append(pData['pm25'])
                if pData['co'] != 0:
                    coall.append(pData['co'])
                if pData['so2'] != 0:
                    so2all.append(pData['so2'])
                if pData['noy'] != 0:
                    noyall.append(pData['noy'])
                if pData['no'] != 0:
                    noall.append(pData['no'])
                if pData['no2'] != 0:
                    no2all.append(pData['no2'])
                if pData['nox'] != 0:
                    noxall.append(pData['nox'])
                if pData['ozone'] != 0:
                    ozoneall.append(pData['ozone'])
                if pData['pm10'] != 0:
                    pm10all.append(pData['pm10'])
                if pData['pm25'] != 0:
                    pm25all.append(pData['pm25'])
                stateData[int(stateNumPrev)] = {'state': stateNamePrev, 'pollutant': pData}
                stateNumPrev = int(line[0])
                stateNamePrev = line[-1]
                pData = {}
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
        pData['co'] = float(format(co/float(loop[0]), '.2f'))
        pData['so2'] = float(format(so2/float(loop[1]), '.2f'))
        pData['noy'] = float(format(noy/float(loop[2]), '.2f'))
        pData['no'] = float(format(no/float(loop[3]), '.2f'))
        pData['no2'] = float(format(no2/float(loop[4]), '.2f'))
        pData['nox'] = float(format(nox/float(loop[5]), '.2f'))
        pData['ozone'] = float(format(ozone/float(loop[6]), '.2f'))
        pData['pm10'] = float(format(pm10/float(loop[7]), '.2f'))
        pData['pm25'] = float(format(pm25/float(loop[8]), '.2f'))
        comean.append(pData['co'])
        so2mean.append(pData['so2'])
        noymean.append(pData['noy'])
        nomean.append(pData['no'])
        no2mean.append(pData['no2'])
        noxmean.append(pData['nox'])
        ozonemean.append(pData['ozone'])
        pm10mean.append(pData['pm10'])
        pm25mean.append(pData['pm25'])
        if pData['co'] != 0:
            coall.append(pData['co'])
        if pData['so2'] != 0:
            so2all.append(pData['so2'])
        if pData['noy'] != 0:
            noyall.append(pData['noy'])
        if pData['no'] != 0:
            noall.append(pData['no'])
        if pData['no2'] != 0:
            no2all.append(pData['no2'])
        if pData['nox'] != 0:
            noxall.append(pData['nox'])
        if pData['ozone'] != 0:
            ozoneall.append(pData['ozone'])
        if pData['pm10'] != 0:
            pm10all.append(pData['pm10'])
        if pData['pm25'] != 0:
            pm25all.append(pData['pm25'])
        stateData['56'] = {'state': stateNamePrev, 'pollutant': pData}
        for each in stateData:
            if stateData[each]['pollutant']['co'] == 0:
                stateData[each]['pollutant']['co'] = format(numpy.mean(comean), '.2f')
            if stateData[each]['pollutant']['so2'] == 0:
                stateData[each]['pollutant']['so2'] = format(numpy.mean(so2mean), '.2f')
            if stateData[each]['pollutant']['noy'] == 0:
                stateData[each]['pollutant']['noy'] = format(numpy.mean(noymean), '.2f')
            if stateData[each]['pollutant']['no'] == 0:
                stateData[each]['pollutant']['no'] = format(numpy.mean(nomean), '.2f')
            if stateData[each]['pollutant']['no2'] == 0:
                stateData[each]['pollutant']['no2'] = format(numpy.mean(no2mean), '.2f')
            if stateData[each]['pollutant']['nox'] == 0:
                stateData[each]['pollutant']['nox'] = format(numpy.mean(noxmean), '.2f')
            if stateData[each]['pollutant']['ozone'] == 0:
                stateData[each]['pollutant']['ozone'] = format(numpy.mean(ozonemean), '.2f')
            if stateData[each]['pollutant']['pm10'] == 0:
                stateData[each]['pollutant']['pm10'] = format(numpy.mean(pm10mean), '.2f')
            if stateData[each]['pollutant']['pm25'] == 0:
                stateData[each]['pollutant']['pm25'] = format(numpy.mean(pm25mean), '.2f')
        useData[year] = stateData
    csvfile.close()
yearMax['co'] = max(coall)
yearMax['so2'] = max(so2all)
yearMax['noy'] = max(noyall)
yearMax['no'] = max(noall)
yearMax['no2'] = max(no2all)
yearMax['nox'] = max(noxall)
yearMax['ozone'] = max(ozoneall)
yearMax['pm10'] = max(pm10all)
yearMax['pm25'] = max(pm25all)
yearMin['co'] = min(coall)
yearMin['so2'] = min(so2all)
yearMin['noy'] = min(noyall)
yearMin['no'] = min(noall)
yearMin['no2'] = min(no2all)
yearMin['nox'] = min(noxall)
yearMin['ozone'] = min(ozoneall)
yearMin['pm10'] = min(pm10all)
yearMin['pm25'] = min(pm25all)
useData['yearMax'] = yearMax
useData['yearMin'] = yearMin
with open('pollution_data.json', 'w') as outfile:
    json.dump(useData, outfile, indent=4, sort_keys=True)

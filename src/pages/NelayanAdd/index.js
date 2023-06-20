import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
    PermissionsAndroid,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function NelayanAdd({ navigation, route }) {


    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        nama_nelayan: '',
        usia_nelayan: '',
        jenis_kelamin_nelayan: 'Laki-laki',
        alamat_nelayan: '',
        jenis_nelayan: '',
        frek_bekerja: 1,
        frek_menyelam: 1,
        kedalaman_menyelam: '',
        riw_pok: 'TIDAK',
        riw_tb: 'TIDAK',
        riw_thalasemio: 'TIDAK',
        riw_kanker: 'TIDAK',
        riw_dm: 'TIDAK',
        riw_lupus: 'TIDAK',
        riw_ppok: 'TIDAK',
        riw_lain: '',
        riw_hipertensi: 'TIDAK',
        riw_ginjal: 'TIDAK',
        foto_nelayan: 'https://zavalabs.com/nogambar.jpg',

    });



    const [pilih, setPilih] = useState({
        a: false,
        b: false,
        c: false,
        d: false
    })


    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'nelayan_add', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    useEffect(() => {
        requestCameraPermission();
    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* biodata */}

                <TouchableOpacity onPress={() => {

                    launchCamera({
                        includeBase64: true,
                        quality: 1,
                        mediaType: "photo",
                        maxWidth: 200,
                        maxHeight: 200
                    }, response => {
                        // console.log('All Response = ', response);

                        setKirim({
                            ...kirim,
                            foto_nelayan: `data:${response.type};base64, ${response.base64}`,
                        });
                    });



                }} style={{
                    width: 180,
                    height: 250,
                    borderWidth: 1,
                    alignSelf: 'center',
                    overflow: 'hidden',
                    borderRadius: 10,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        width: 180,
                        height: 250,
                    }} source={{
                        uri: kirim.foto_nelayan,
                    }} />
                </TouchableOpacity>
                <View style={{
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderRadius: 10,
                    borderColor: colors.primary
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 15,
                            textAlign: 'center',
                        }}>Biodata</Text>
                    </View>
                    <View style={{
                        padding: 10,
                    }}>
                        <MyInput label="Nama" iconname="person" placeholder="Masukan nama" value={kirim.nama_nelayan} onChangeText={x => setKirim({ ...kirim, nama_nelayan: x })} />
                        <MyGap jarak={10} />
                        <MyInput label="Usia (Tahun)" iconname="body" placeholder="Masukan usia" value={kirim.usia_nelayan} onChangeText={x => setKirim({ ...kirim, usia_nelayan: x })} />
                        <MyGap jarak={10} />
                        <MyPicker label="Jenis Kelamin" value={kirim.jenis_kelamin_nelayan} onValueChange={x => setKirim({ ...kirim, jenis_kelamin_nelayan: x })} iconname="male-female" data={[
                            {
                                value: 'Laki-laki',
                                label: 'Laki-laki'
                            },
                            {
                                value: 'Perempuan',
                                label: 'Perempuan'
                            },

                        ]} />
                        <MyGap jarak={10} />
                        <MyInput label="Alamat" placeholder="Masukan alamat" iconname="location" value={kirim.alamat_nelayan} onChangeText={x => setKirim({ ...kirim, alamat_nelayan: x })} />
                        <MyGap jarak={10} />


                        {/* <MyPicker label="Jenis Nelayan" value={kirim.jenis_nelayan} onValueChange={x => setKirim({ ...kirim, jenis_nelayan: x })} iconname="male-female" data={[
                            { value: 'Nelayan Penyelam', label: 'Nelayan Penyelam' },
                            { value: 'Nelayan Memancing', label: 'Nelayan Memancing' },
                            { value: 'Nelayan Kapal', label: 'Nelayan Kapal' },
                            { value: 'Nelayan', label: 'Nelayan' },


                        ]} /> */}
                        <Text>{kirim.jenis_nelayan.toString().substring(0, kirim.jenis_nelayan.length - 1)}</Text>
                        <View
                            style={{

                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}>
                            <Icon type="ionicon" name="list" color={colors.black} size={16} />
                            <Text
                                style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.black,
                                    left: 10,
                                    fontSize: 12,

                                }}>
                                Jenis Nelayan
                            </Text>
                        </View>

                        <TouchableOpacity onPress={() => {
                            if (!pilih.a) {
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan + 'Nelayan Penyelam,'
                                })
                                setPilih({ ...pilih, a: true, })
                            } else {
                                setPilih({ ...pilih, a: false })
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan.replace('Nelayan Penyelam,', '')
                                })
                            }

                        }} style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth / 2
                        }}>
                            <Icon type="ionicon" name="checkbox" color={pilih.a ? colors.primary : colors.black} size={20} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                flex: 1,
                                left: 5,
                                fontSize: 14,

                            }}>Nelayan Penyelam</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (!pilih.b) {
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan + 'Nelayan Memancing,'
                                })
                                setPilih({ ...pilih, b: true })
                            } else {
                                setPilih({ ...pilih, b: false })
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan.replace('Nelayan Memancing,', '')
                                })
                            }

                        }} style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth / 2
                        }}>
                            <Icon type="ionicon" name="checkbox" color={pilih.b ? colors.primary : colors.black} size={20} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                flex: 1,
                                left: 5,
                                fontSize: 14,

                            }}>Nelayan Memancing</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (!pilih.c) {
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan + 'Nelayan Kapal,'
                                })
                                setPilih({ ...pilih, c: true })
                            } else {
                                setPilih({ ...pilih, c: false })
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan.replace('Nelayan Kapal,', '')
                                })
                            }

                        }} style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth / 2
                        }}>
                            <Icon type="ionicon" name="checkbox" color={pilih.c ? colors.primary : colors.black} size={20} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                flex: 1,
                                left: 5,
                                fontSize: 14,

                            }}>Nelayan Kapal</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            if (!pilih.d) {
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan + 'Nelayan Lainnya,'
                                })
                                setPilih({ ...pilih, d: true })
                            } else {
                                setPilih({ ...pilih, d: false })
                                setKirim({
                                    ...kirim,
                                    jenis_nelayan: kirim.jenis_nelayan.replace('Nelayan Lainnya,', '')
                                })
                            }

                        }} style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: windowWidth / 2
                        }}>
                            <Icon type="ionicon" name="checkbox" color={pilih.d ? colors.primary : colors.black} size={20} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                flex: 1,
                                left: 5,
                                fontSize: 14,

                            }}>Nelayan Lainnya</Text>

                        </TouchableOpacity>

                    </View>
                </View>

                {/* data aktifitas */}
                <View style={{
                    marginTop: 10,
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderRadius: 10,
                    borderColor: colors.primary
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 15,
                            textAlign: 'center',
                        }}>Data Aktifitas Nelayan</Text>
                    </View>
                    <View style={{
                        padding: 10,
                    }}>
                        <MyPicker label="Frek. Menyelam (Hanya diisi oleh nelayan penyelam)" value={kirim.frek_menyelam} onValueChange={x => setKirim({ ...kirim, frek_menyelam: x })} iconname="analytics" data={[
                            { value: '1', label: '1x' },
                            { value: '2', label: '2x' },
                            { value: '3', label: '3x' },
                            { value: '4', label: '4x' },
                            { value: 'Dan Lainnya', label: 'Dan Lainnya' },
                        ]} /><MyGap jarak={10} />
                        <MyPicker label="Frek. Bekerja (Diisi oleh yang bukan penyelam)" value={kirim.frek_bekerja} onValueChange={x => setKirim({ ...kirim, frek_bekerja: x })} iconname="boat" data={[
                            { value: '1', label: '1x' },
                            { value: '2', label: '2x' },
                            { value: '3', label: '3x' },
                            { value: '4', label: '4x' },
                            { value: 'Dan Lainnya', label: 'Dan Lainnya' },
                        ]} /><MyGap jarak={10} />
                        <MyInput label="Kedalaman Penyelaman (Meter)" iconname="filter" placeholder="Masukan kedalaman penyelaman" value={kirim.kedalaman_menyelam} onChangeText={x => setKirim({ ...kirim, kedalaman_menyelam: x })} />
                        <MyGap jarak={10} />

                    </View>
                </View>

                {/* data riwayat Penyakit */}
                <View style={{
                    marginTop: 10,
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderRadius: 10,
                    borderColor: colors.primary
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.black,
                            fontSize: 15,
                            textAlign: 'center',
                        }}>Riwayat Penyakit Nelayan</Text>
                    </View>
                    <View style={{
                        padding: 10,
                    }}>

                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                                <MyPicker label="Penyakit Jantung"
                                    value={kirim.riw_pok}
                                    onValueChange={x => setKirim({ ...kirim, riw_pok: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />

                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                                <MyPicker label="TB"
                                    value={kirim.riw_tb}
                                    onValueChange={x => setKirim({ ...kirim, riw_tb: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                                <MyPicker label="Thalasemia"
                                    value={kirim.riw_thalasemio}
                                    onValueChange={x => setKirim({ ...kirim, riw_thalasemio: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />

                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                                <MyPicker label="Kanker"
                                    value={kirim.riw_kanker}
                                    onValueChange={x => setKirim({ ...kirim, riw_kanker: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                                <MyPicker label="DM"
                                    value={kirim.riw_dm}
                                    onValueChange={x => setKirim({ ...kirim, riw_dm: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />

                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                                <MyPicker label="Lupus"
                                    value={kirim.riw_lupus}
                                    onValueChange={x => setKirim({ ...kirim, riw_lupus: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                                <MyPicker label="PPOK"
                                    value={kirim.riw_ppok}
                                    onValueChange={x => setKirim({ ...kirim, riw_ppok: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />

                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                                <MyInput value={kirim.riw_lain} onChangeText={x => {
                                    setKirim({ ...kirim, riw_lain: x })
                                }} label="Penyakit Lain" iconname="medkit-outline" placeholder="Masukan penyakit lain" />

                            </View>


                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 5,
                        }}>
                            <View style={{
                                flex: 1,
                                paddingRight: 5,
                            }}>
                                <MyPicker label="Hipertensi"
                                    value={kirim.riw_hipertensi}
                                    onValueChange={x => setKirim({ ...kirim, riw_hipertensi: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />

                            </View>
                            <View style={{
                                flex: 1,
                                paddingLeft: 5,
                            }}>
                                <MyPicker label="Penyakit Ginjal"
                                    value={kirim.riw_ginjal}
                                    onValueChange={x => setKirim({ ...kirim, riw_ginjal: x })} iconname="medkit-outline" data={[
                                        { value: 'TIDAK', label: 'TIDAK' },
                                        { value: 'YA', label: 'YA' },
                                    ]} />
                            </View>
                        </View>

                    </View>
                </View>
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})